import styles from './<%= Name %>.less';

export default function() {
  return (
    <div className={styles['<%= Name %>']}>
      <h1>Basic Component <%= Name %></h1>
    </div>
  );
}
