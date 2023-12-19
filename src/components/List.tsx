import { useState } from "react";
import { ClipboardText } from "phosphor-react";

import { Form } from "./Form";
import { Task } from "./Task";

import styles from './List.module.css';

interface TaskType {
  completed: boolean;
  content: string;
}

export const List = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleAddNewTask = (taskContent: string) => {
    setTasks([...tasks, {
      completed: false,
      content: taskContent
    }]);
  }

  const handleRemoveTask = (taskContent: string) => {
    const newTasks = tasks.filter(task => taskContent !== task.content);

    setTasks(newTasks);
  }

  const handleCheckTask = (taskContent: string) => {
    const newTasks = [...tasks];
    const index = tasks.findIndex(task => taskContent === task.content);

    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;

  return (
    <section className={styles.listContainer}>
      <Form onAddNewTask={handleAddNewTask} />

      <>
        <header className={styles.tasksHeader}>
          <p className={styles.total}>
            Tarefas criadas
            <span>{total}</span>
          </p>
          <p className={styles.completed}>
            Concluídas
            <span>
              {total ? `${completed} de ${total}` : completed}
            </span>
          </p>
        </header>
        <div className={styles.tasksContainer}>
          {total ? tasks.map(task =>
            <Task
              key={task.content}
              task={task}
              onCheckTask={handleCheckTask}
              onRemoveTask={handleRemoveTask}
            />
          ) :
            <article className={styles.emptyList}>
              <ClipboardText size={56} />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </p>
            </article>
          }
        </div>
      </>
    </section>
  );
}