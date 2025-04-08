import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './task.model';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
toggleReminder(_t3: Task) {
throw new Error('Method not implemented.');
}
  @Input() tasks: Task[] = [];
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleComplete: EventEmitter<Task> = new EventEmitter();

  editingTask: Task | null = null;
  editedText: string = '';
  editedDay: string = '';

  deleteTask(task: Task) {
    this.onDeleteTask.emit(task);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed; // Marque comme terminé ou non
    this.onToggleComplete.emit(task);
  }

  editTask(task: Task) {
    const updatedText = prompt("Modifier la tâche:", task.text); // Ouvre une boîte de dialogue pour modifier le texte
    if (updatedText !== null && updatedText.trim() !== '') {
      task.text = updatedText;
      this.onEditTask.emit(task);
    }
  }

  saveTask(task: Task) {
    if (this.editingTask) {
      task.text = this.editedText;
      task.day = this.editedDay;
      this.onEditTask.emit(task);
      this.editingTask = null;
    }
  }

 
}
export type { Task };

