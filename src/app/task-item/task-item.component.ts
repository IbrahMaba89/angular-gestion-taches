import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../tasks/tasks.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask = new EventEmitter<Task>();
  @Output() onCompleteTask = new EventEmitter<Task>();

  isEditing = false;
  editedText = '';
  editedDay = '';

  ngOnInit() {
    this.editedText = this.task.text;
    this.editedDay = this.task.day;
  }

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }

  onEdit(task: Task) {
    this.isEditing = true;
  }

  saveEdit(task: Task) {
    if (this.editedText.trim() && this.editedDay.trim()) {
      task.text = this.editedText;
      task.day = this.editedDay;
      this.isEditing = false;
      this.onEditTask.emit(task);
    }
  }

  
  onComplete(task: Task) {
    this.onCompleteTask.emit(task);
  }

}
