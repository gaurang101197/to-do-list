/**
 * RecurringTask.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  datastore: 'prod',
  primaryKey: 'taskId',
  tableName: 'recurring_task',

  attributes: {
    taskId: {
      type: 'number',
      autoIncrement: true,
      // columnName: 'taskId',
    },
    userId: {
      type: 'number',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    createdTime: {
      type: 'number',
      autoCreatedAt: true,
    },
    modifiedTime: {
      type: 'number',
      autoUpdatedAt: true,
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
    frequency: {
      type: 'number',
    }
  },
  //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
  //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
  //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


  //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
  //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
  //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


  //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
};

