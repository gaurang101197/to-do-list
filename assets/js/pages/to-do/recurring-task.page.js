parasails.registerPage('recurring-task', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    newTaskId: "newTaskId",
    recurringTaskId: "recurringTask",
    newTaskTip: "Type here to add new task...",
    recurringTasks: [],
    getRecurringTasksRequestBaseUrl: "http://localhost:1337/api/task/getRecurringTaskList",
    updateRecurringTasksUrl: "http://localhost:1337/api/task/updateTask",
    addRecurringTaskUrl: "http://localhost:1337/api/task/addTask",
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    this.loadRecurringTasks();
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    loadRecurringTasks: function () {
      axios.get(this.getRecurringTasksRequestBaseUrl).then(response => (this.recurringTasks = response.data.tasks));
    },

    updateRecurringTaskInDb: function(updatedTaskId, updatedTaskInfo){
      let requestData = {
        "taskId": updatedTaskId,
        "type": 'NONDAILY',
        "task": updatedTaskInfo,
      }
      console.log(requestData);
      axios.put(this.updateRecurringTasksUrl, requestData).catch(error => this.handleAxiosError(error));
    },

    addRecurringTaskInDb: function(name){
      let requestData = {
        "name": name,
        "type": "RECURRING"
      }
      axios.put(this.addRecurringTaskUrl, requestData).then(response => {return response.data.taskId;}).catch(error => this.handleAxiosError(error));
    },

    handleAxiosError: function(error){
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    },

    editTask: function (event, index) {
      let id = this.recurringTaskId + index;
      let newContent = document.getElementById(id).textContent.trim();
      this.recurringTasks[index].name = newContent;
      document.getElementById(id).blur();
      this.updateRecurringTaskInDb(this.recurringTasks[index].taskId, {"name":newContent});
    },

    editTaskOnBlur: function (index) {
      let id = this.recurringTaskId + index;
      // console.log(id)
      let newContent = document.getElementById(id).textContent.trim();
      this.recurringTasks[index].name = newContent;
      this.updateRecurringTaskInDb(this.recurringTasks[index].taskId, {"name":newContent});
    },

    addRecurringTask: function () {
      let id = this.newTaskId + this.recurringTasks.length;
      let newTaskName = document.getElementById(id).textContent.trim();
      if (typeof newTaskName !== 'undefined' && newTaskName.length != 0) {
        let taskId = this.addRecurringTaskInDb(newTaskName);
        let temp = {
          "taskId": taskId,
          // "userId": 1,
          "name": newTaskName,
          "isActive": true
        }
        this.recurringTasks.push(temp);
        document.getElementById(id).id = this.newTaskId + this.recurringTasks.length;
        id = this.newTaskId + this.recurringTasks.length;
        document.getElementById(id).textContent = null;
        document.getElementById(id).blur();
      }
    },

    removeRecurringTask: function (index) {
      this.recurringTasks[index].isActive = false;
      this.updateRecurringTaskInDb(this.recurringTasks[index].taskId, {"isActive":this.recurringTasks[index].isActive});
    }
  }
});
