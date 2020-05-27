/**
 * GetTasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    friendlyName: 'get user\'s list of daily tasks for given date',
    description: '',

    inputs: {
        // userId: {
        //     description: 'user\'s id using on which tasks\' look up will happen in database',
        //     type: 'number',
        // },
        date: {
            description: 'which date\'s tasks user want to see, format:yyyy-mm-dd',
            type: 'string',
            required: true,
            // date regex pattern YYYY-MM-DD
            regex: /^\d{4}-\d{2}-\d{2}/,
            custom: function (value) {
                return typeof value !== 'undefined' && value.length === 'YYYY-MM-DD'.length;
            }
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'list of daily tasks is returned',
        },
        invalidRequest: {
            statusCode: 400,
            description: 'Invalid request',
        },
        error: {
            statusCode: 500,
            description: 'Failed to add new task in database',
        },
    },

    fn: async function (inputs) {
        console.log('Request for getting Daily tasks: ', inputs);
        if(typeof inputs.userId === 'undefined'){
            inputs.userId = this.req.me.id;
        }
        if (typeof inputs.userId !== 'undefined') {
            var tasks = await DailyTask.find({
                select: [
                    'taskId', 
                    // 'userId', 
                    'type', 
                    'name', 
                    'isDone', 
                    'isActive'],
                where: {
                    date: inputs.date,
                    userId: inputs.userId,
                    isActive: true,
                }
            });
            console.log('Daily tasks: ', tasks);
            var todayDate = await CommonUtils.formatDateYYYYMMDD(new Date());
            if (inputs.date > todayDate) {
                console.log('Getting task for future date');
                recurringTasks = await RecurringTask.find({
                    select: [
                        'taskId', 
                        // 'userId', 
                        'name', 
                        'isActive'],
                    where: {
                        userId: inputs.userId,
                        isActive: true,
                    }
                });
                recurringTasks.forEach(function (record) {
                    _.extend(record, { type: 'RECURRING', isDone: false });
                });
                console.log('Recurring task: ', recurringTasks)
                tasks.push.apply(tasks, recurringTasks)
                console.log('tasks after adding recurring tasks: ', tasks)
            }
            return {
                'tasks': tasks
            }
        } else {
            throw {invalidRequest: ['userId required']}
        }
    }

};

