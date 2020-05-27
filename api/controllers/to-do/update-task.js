/**
 * UpdateTaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    friendlyName: 'update the task',
    description: 'update the recurring and daily both task\'s information based on parameter passed',

    inputs: {
        userId: {
            description: 'The ID of User who want to update task',
            type: 'number',
        },
        taskId: {
            description: 'The task Id which information will be updated',
            type: 'number',
            required: true,
        },
        type: {
            description: 'task type which is useful to determine in which table, we need to update record. DAILY for daily to-do tasks and NONDAILY for recurring task which is added to daily tasks',
            type: 'string',
            required: true,
            isIn: ['DAILY', 'NONDAILY']
        },
        task: {
            description: 'The task which will be updated',
            type: 'ref',
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'task is updated successfully',
        },
        invalidRequest: {
            statusCode: 400,
            description: 'Invalid request',
        },
        error: {
            statusCode: 500,
            description: 'Failed to update task in database',
        },
    },

    fn: async function (inputs) {
        console.info('Request for updating task: ', inputs);
        if (typeof inputs.userId === 'undefined') {
            inputs.userId = this.req.me.id;
        }
        if (typeof inputs.userId !== 'undefined') {
            // if task updation is on DAILY tasks then update in DailyTask table otherwise in RecurringTask table.
            if (inputs.type === 'DAILY') {
                var updatedRecord = await DailyTask.updateOne({
                    where: {
                        taskId: inputs.taskId,
                        //  we can directly update the task using taskId but it gives more controlled over which users can update which task if we also provide userId while updating.
                        userId: inputs.userId,
                    }
                }).set(inputs.task);
                console.log('UpdatedTask: ', updatedRecord);
            } else {
                var updatedRecord = await RecurringTask.updateOne({
                    where: {
                        taskId: inputs.taskId,
                        //  we can directly update the task using taskId but it gives more controlled over which users can update which task if we also provide userId while updating.
                        userId: inputs.userId,
                    }
                }).set(inputs.task);
                console.log('UpdatedRecurringTask: ', updatedRecord);
            }
            if (typeof updatedRecord === 'undefined') {
                return exits.invalidRequest;
            }
        } else {
            throw { invalidRequest: ['userId required'] }
        }
    }

};