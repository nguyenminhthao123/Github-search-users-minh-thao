import React, { useContext } from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';

const UserInfo = () => {
  const data = useContext(GithubContext)
  const { id, public_repos, followers, following, public_gists } = data.gitHubUser
  const Items = [
    {
      id: 1,
      icon: <GoRepo className="icon" />,
      lable: 'repo',
      value: public_repos,
      color: 'pink'
    },
    {
      id: 2,
      icon: <FiUsers className="icon" />,
      lable: 'followers',
      value: followers,
      color: 'green'
    },
    {
      id: 3,
      icon: <FiUserPlus className="icon" />,
      lable: 'following',
      value: following,
      color: 'purple'
    },
    {
      id: 4,
      icon: <GoGist className="icon" />,
      lable: 'Gists',
      value: public_gists,
      color: 'yellow'
    }
  ]
  return (
    <section className="section">
      <Wrapper className="section-center">
        {Items.map((item, index) => {
          return (
            <article key={index} className="item">
              <span className={item.color}>{item.icon}</span>
              <div>
                <h3>{item.value}</h3>
                <p>{item.lable}</p>
              </div>
            </article>
          )
        })}
      </Wrapper>
    </section>
  )
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;
