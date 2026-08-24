import {Directive, HostBinding, HostListener, output} from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DndDirective {
  fileDropped = output<File | undefined>()

  @HostBinding('class.fileover')
  fileover = false

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault()

    this.fileover = true
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault()

    this.fileover = false
  }

  @HostListener('drop', ['$event'])
  drop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault()

    this.fileover = false

    this.fileDropped.emit(event.dataTransfer?.files[0])
  }
}
