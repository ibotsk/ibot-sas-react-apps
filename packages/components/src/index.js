import React from 'react'
import styles from './styles.module.css'

export { default as BootstrapTable } from 'react-bootstrap-table-next';
export { default as LosName } from './Species/LosName';
export { default as TimestampCheck } from './Common/TimestampCheck';

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
