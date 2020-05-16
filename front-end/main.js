Vue.component('list', {
    template: `
        <div>
            <div class="tasks">
                <ul class="todo-list list-group">
                    <li class="list-group-item" v-for="(element, index) in toDoList" :key="element + index">
                        <input type="checkbox" :id="TO_DO_ELEMENT + index" :name="TO_DO_ELEMENT + index" @change="markTaskDone(index)">
                        {{ element }}
                        <button type="button" class="close" aria-label="Close" @click="removeTaskFromToDoList(index)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </li>
                    <li class="list-group-item">
                        <input type="text" v-model="newTask" id="addTask" placeholder="Add new task">
                        <button type="button" v-on:click="addTaskInToDoList" >Add Task</button>
                    </li>
                </ul>
                
                <ul class="done-list list-group">
                    <li class="list-group-item" v-for="(element, index) in doneList" :key="element + index">
                        <input type="checkbox" :id="DONE_ELEMENT + index" :name="DONE_ELEMENT + index" @change="markTaskUndo(index)">
                        {{ element }}                        
                        <button type="button" class="close" aria-label="Close" @click="removeTaskFromToDoList(index)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    `,
    data() {
        return {
            newTask: '',
            TO_DO_ELEMENT: 'todo-element-',
            DONE_ELEMENT: 'done-element-',
            toDoList: [
                'task1asaaaaaaaksabdb akdkabdabkd dbadbkasbdkbad kdabdkanbdanka dkbakdbakbda  kdbakbdkbak  akdbakbdka k da kabdk da dk aksdbkabdkakndkandkakbk dakd a dka da dka a k dk ak da k d ak dkja d ',
                'task2',
                'task3',
                'task1',
                'task2'
            ],
            doneList: [
                'task4',
                'task5',
                'task6'
            ]
        }
    },
    methods: {
        markTaskDone: function (index) {
            this.doneList.push(this.toDoList[index]);
            this.toDoList.splice(index, 1);
        },
        markTaskUndo: function (index) {
            this.toDoList.push(this.doneList[index]);
            this.doneList.splice(index, 1);
        },
        removeTaskFromToDoList: function (index) {
            this.toDoList.splice(index, 1);
        },
        removeTaskFromDoneList: function (index) {
            this.doneList.splice(index, 1);
        },
        addTaskInToDoList: function () {
            this.toDoList.push(this.newTask);
            this.newTask = null;
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
    },
    methods: {
    }
})