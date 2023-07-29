import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import styles from '../../styles/Membros.module.css'
import { handleJSONfiles } from '../../../functions/jsonHandler'

export default function Membros({ membros }) {
    return (
        <div className={styles['container']}>
            <Head>
              <title>Membros do projetos :) </title>
            </Head>
            <h1>Membros queridos do projetos</h1>
            {membros.map((membro) => {
                return(
                    <div className={`${styles['card']}`}>
                        <span>{membro.nome}</span>
                        <img className={styles['img']} src={membro.foto}></img>
                        <span> {membro.cargo === "Não" ? "Membro" : membro.cargo} </span>
                        <span>Entrou no {membro.semestre_entrada}° semestre</span>
                        <span>{membro.data_entrada}</span>
                    </div>
                )
            })}
        </div>
    )
}

export async function getStaticProps(){
  const membros = handleJSONfiles("./content/membros_projetos");
  
  return {
    props: { membros },
  };
}