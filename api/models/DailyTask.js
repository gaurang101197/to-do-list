/**
 * Task.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  datastore: 'prod',
  primaryKey: 'taskId',
  tableName: 'daily_task',

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
    type: {
      type: 'string',
      required: true,
      isIn: ['ADHOC','SCHEDULED','RECURRING'],
    },
    name: {
      type: 'string',
      required: true,
    },
    isDone: {
      type: 'boolean',
      defaultsTo: false,
    },
    date: {
      type: 'string',
      required: true,
      columnType: 'date',
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
  },

};

