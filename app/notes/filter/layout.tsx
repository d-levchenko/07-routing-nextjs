import css from './LayoutNotes.module.css';

import { ReactNode } from 'react';

interface FilterOptionsProps {
  children: ReactNode;
  sidebar: ReactNode;
}

const FilterOptions = ({ children, sidebar }: FilterOptionsProps) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
};

export default FilterOptions;
