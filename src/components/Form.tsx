import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import styles from './List.module.css';

interface FormProps {
  onAddNewTask: (task: string) => void;
}

export const Form = ({ onAddNewTask }: FormProps) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleChangeNewTask = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.target.setCustomValidity('');

    setNewTask(value);
  }

  const handleAddNewTask = (event: FormEvent) => {
    event.preventDefault();

    onAddNewTask(newTask);
    setNewTask('');
  }

  const handleInvalidNewTask = (event: InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('Esse campo eh obrigatorio!');
  }

  const isNewTaskEmpty = !newTask.length;

  return (
    <section className={styles.listContainer}>
      <form onSubmit={handleAddNewTask}>
        <input
          type="text"
          value={newTask}
          placeholder="Adicione uma nova tarefa"
          onChange={handleChangeNewTask}
          onInvalid={handleInvalidNewTask}
          required
        />
        <button type="submit" disabled={isNewTaskEmpty}>
          Criar
          <PlusCircle size={16} />
        </button>
      </form>
    </section>
  );
}