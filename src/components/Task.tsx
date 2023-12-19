import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
  task: {
    content: string;
    completed: boolean;
  };
  onCheckTask: (task: string) => void;
  onRemoveTask: (task: string) => void;
}

export const Task = ({ task, onCheckTask, onRemoveTask }: TaskProps) => {
  return (
    <article className={`${styles.taskContainer} ${task.completed && styles.completed}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onClick={() => onCheckTask(task.content)}
      />
      <p>
        {task.content}
      </p>
      <button title="Deletar tarefa" onClick={() => onRemoveTask(task.content)}>
        <Trash size={24} />
      </button>
    </article>
  );
}