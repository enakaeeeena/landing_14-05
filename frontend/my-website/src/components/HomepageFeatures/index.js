import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Импортируем изображения как модули
import docMeme from '@site/static/img/doc_meme_png.png';
import importantMeme from '@site/static/img/important_meme_png.png';
import reactMeme from '@site/static/img/react_meme_png.png';

const FeatureList = [
  {
    title: 'Просто в использовании',
    img: docMeme,
    description: (
      <>
        Быстрый доступ к документации всего нашего проекта.
      </>
    ),
  },
  {
    title: 'Акцент на том, что важно',
    img: importantMeme,
    description: (
      <>
        Благодаря великому Доказавру мы можем быстро и доступно изменять всё, что захотим (даже время и материю).
      </>
    ),
  },
  {
    title: 'Сидит на Реакте',
    img: reactMeme,
    description: (
      <>
        Ну а кто нет?
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Обязательно передаём src */}
        <img src={img} className={styles.featureSvg} alt={title} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
