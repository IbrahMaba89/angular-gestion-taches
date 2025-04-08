

import { Component, ViewEncapsulation } from '@angular/core';
import { Task } from './tasks/task.model';
import { AddTaskComponent } from "./add-task/add-task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [AddTaskComponent, CommonModule]
})
export class AppComponent {
  tasks: Task[] = [];
  showTasks: boolean = false;
  task!: Task;

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  }

  saveTasks() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  addTask(newTask: Task) {
    this.tasks = [...this.tasks, newTask];
    this.saveTasks();
  }

  deleteTask(taskToDelete: Task) {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
    this.saveTasks();
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  editTask(task: Task) {
    const updatedText = prompt("Modifier la tâche:", task.text);
    if (updatedText !== null && updatedText.trim() !== '') {
      task.text = updatedText;
      this.saveTasks();
    }
  }
}
