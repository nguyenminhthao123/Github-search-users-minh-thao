import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = useContext(GithubContext)
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    if (!language) {
      return total
    }

    if (!total[language]) {
      total[language] = { label: language, value: 1, start: stargazers_count }
    } else {
      total[language] = { ...total[language], value: total[language].value + 1, start: total[language].start + stargazers_count }
    }

    return total
  }, {})
  const datapie3d = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  }).splice(0, 5)
  const datadoughnut = Object.values(languages).sort((a, b) => {
    return b.start - a.start;
  }).map((item) => {
    return { ...item, value: item.start }
  }).splice(0, 5)
  // will
  let { start, forks } = repos.reduce((total, item) => {
    const { stargazers_count, forks, name } = item
    total.start[stargazers_count] = { label: name, value: stargazers_count }
    total.forks[stargazers_count] = { label: name, value: forks }
    return total
  }, {
    start: {},
    forks: {},
  })
  const dataStart = Object.values(start).slice(-5).reverse()
  const dataForks = Object.values(forks).slice(-5).reverse()
  return (
    <section className="section">
      <Wrapper className="section-center">

        <Pie3D data={datapie3d} />
        <Column3D data={dataStart} />
        <Doughnut2D data={datadoughnut} />
        <Bar3D data={dataForks} />
      </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
