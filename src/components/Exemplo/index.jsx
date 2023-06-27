import Link from 'next/link'
import React from 'react'
import styles from './style.module.css'
export default function Exemplo(props) {
  return (
    <Link key={props.key || 0} className={styles["link"]} href={props.href}>
        <div className={styles["card"]}>
          {props.children}
        </div>
    </Link>
  )
}
