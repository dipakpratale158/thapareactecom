import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
//go to about file
const HeroSection = ({ myData }) => {
  const { name } = myData;

  return (
    <Wrapper>
    <div className="container">
  <div className="grid grid-two-column">
    <div className="hero-section-data">
      <h1 className="hero-title">{name}</h1>
      <p className="hero-intro">Welcome to our online store</p>
      <p className="hero-description">
        Discover a wide range of products for all your needs, from electronics
        to fashion, and much more. Shop now and enjoy our unbeatable prices and
        exceptional customer service.
      </p>
      <NavLink to="/shop">
        <Button className="hero-btn">Shop now</Button>
      </NavLink>
    </div>
    {/* our homepage image  */}
    <div className="hero-section-image">
      <figure>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfzKmQAb34wHpJEUWs8UqJWrHtIIaWuQJJWm9BhETJg&usqp=CAU&ec=48665698"
          alt="hero-section-photo"
          className="img-style"
          style={{height:"367px"}}
        />
      </figure>
    </div>
  </div>
</div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: #ceebe9;
    }
  }
`;

export default HeroSection;
