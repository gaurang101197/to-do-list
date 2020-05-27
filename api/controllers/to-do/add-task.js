/**
 * AddTaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    friendlyName: 'add task',

    description: 'whenever user add task to to-list for particular date, this action provides utility to add task in database.',

    // defaultsTo
    inputs: {
        // userId: {
        //     description: 'The ID of user who wants to add task',
        //     type: 'number',
        //     // required: true,
        // },
        type: {
            description: 'type of the task',
            type: 'string',
            isIn: ['ADHOC', 'SCHEDULED', 'RECURRING'],
            defaultsTo: 'ADHOC',
        },
        name: {
            description: 'what is the task, task\'s description',
            type: 'string',
            required: true,
        },
        date: {
            description: 'for which date user want to add task, This is not required for recurring task but for other it must be present',
            type: 'string',
            // date regex pattern YYYY-MM-DD
            regex: /\d{4}-\d{2}-\d{2}/,
            // defaultsTo: CommonUtils.formatDateYYYYMMDD(new Date()),
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'task is added successfully. Return taskId',
        },
        invalidRequest: {
            statusCode: 400,
            description: 'Invalid request',
        },
        error: {
            statusCode: 500,
            description: 'Failed to add new task in database'
        },
    },

    fn: async function (inputs) {
        console.log('Request for adding task: ', inputs);
        if (typeof inputs.userId === 'undefined') {
            inputs.userId = this.req.me.id;
        }
        if (typeof inputs.userId !== 'undefined') {
            if (inputs.type === 'RECURRING') {
                var task = await RecurringTask.create({
                    userId: inputs.userId,
                    type: inputs.type,
                    name: inputs.name,
                }).fetch();
            } else {
                if (typeof inputs.date === 'undefined') {
                    console.error('date must be provided to add SCHEDULED or ADHOC task');
                    throw { invalidRequest: ['date must be provided to add SCHEDULED or ADHOC task'] };
                }
                var task = await DailyTask.create({
                    userId: inputs.userId,
                    type: inputs.type,
                    name: inputs.name,
                    date: inputs.date,
                }).fetch();
            }
            console.log('task is added: ', task);
            return {
                'taskId': task.taskId
            };
        } else {
            throw { invalidRequest: ['Unauthorized user'] }
        }
    }


};