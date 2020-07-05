import React from "react";
import { string, number, array } from "prop-types";
import {animated, interpolate} from "react-spring";
import Carousel from "nuka-carousel";

type values = {
    i: number,
    x: number,
    y: number,
    scale: number,
    trans: any,
    bind: any,
    data: data[]
}
type data = {
    name: string,
    tags: any[]
    text: string,
    pics: any[]
}
const ClubCard = ({i, x, y, scale, trans, bind, data }: values) => {
  const { name, tags, text, pics } = data[i];

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x: number, y: number) => `translate3d(${x}px,${y}px, 0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([scale], trans)
        }}
      >
        <div className="card">
          <Carousel>
            {pics.map((pic, index) => (
              <img src={pic} key={index} alt="profilePicture" />
            ))}
          </Carousel>
          <h2>{name},</h2>
          <h5>{tags}</h5>
          <h5>{text}</h5>
        </div>
      </animated.div>
    </animated.div>
  );
};

ClubCard.propTypes = {
    name: string,
    tags: array,
    text: string,
    pics: array
  };

export default ClubCard;