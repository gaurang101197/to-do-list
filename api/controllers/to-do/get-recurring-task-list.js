/**
 * GetTasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'get user\'s list of recurring tasks',
  description: '',

  inputs: {
    userId: {
      description: 'user\'s id using on which tasks\' look up will happen in database',
      type: 'number',
    }
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'list of recurring tasks is returned',
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
    if(typeof inputs.userId === 'undefined'){
      inputs.userId = this.req.me.id;
    }
    if(typeof inputs.userId !== 'undefined'){
      console.log('Request for getting Recurring tasks: ', inputs);
      var tasks = await RecurringTask.find({
        select: [
          'taskId', 
          // 'userId', 
          'name', 
          'isActive', 
          'frequency'],
        where: {
          userId: inputs.userId,
          isActive: true,
        }
      });
      console.log('Recurring tasks: ', tasks);
      return {
        'tasks': tasks
      }
    } else {
      throw {invalidRequest:['userId required']}
    }
  }

};

