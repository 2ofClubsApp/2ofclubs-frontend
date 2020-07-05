import React, {useState} from "react";
import {useSprings} from "react-spring";
import {useGesture} from "react-with-gesture";
import {prependOnceListener} from "process";

import data from "./testdata";
import ClubCard from "./ClubCard";
// import "./styles/Deck.css";

// End position of the card
const to = (i: number) => ({
    x: 0,
    y: 0,
    scale: 1,
    delay: i * 100
});

// Starting position of the card
const from = (i: number) => ({scale: 1.5, y: -1000});

// changes scale 
const trans = (s: number) =>
    `scale(${s})`;

const ClubDeck = () => {
    // like using this.gone but function doesn't have this.x
    // so we declare a state variable
    // created a new set with gone
    const [gone] = useState(() => new Set());

    const [props, set] = useSprings(data.length, i => ({
        // data.length gets number of elements in array
        ...to(i),
        from: from(i)
    }));

    const bind = useGesture(
        // state
        ({
             args: [index],
             down,
             delta: [xDelta],
             distance,
             direction: [xDir],
             velocity
         }) =>
            // do something
        {
            // trigger if velocity is greater than 0.2
            const trigger = velocity > 0.2;

            // if x direction is less than 0, return -1, else return 1
            const dir = xDir < 0 ? -1 : 1;

            // if "card picked up" and swiped right, add to gone set
            if (!down && trigger) {
                if ((xDir > 0)) {
                    //add to match
                } else {
                    // add to reject
                }
                gone.add(index);
            }
            // @ts-ignore
            set(i => {
                if (index !== i) return;

                // boolean checking if the card is gone or not
                const isGone = gone.has(index);

                const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

                const scale = down ? 1.1 : 1;

                return {
                    x,
                    scale,
                    delay: undefined,
                    config: {friction: 50, tension: down ? 800 : isGone ? 200 : 500}
                    /* if down
                        800
                        else {
                            if isGone
                                200
                            else
                                500*/

                };
            });

            // Keep track of which way the person swipped
            if (!down && trigger) {
                console.log(xDir);
                console.log("Gone");
            }

            /*// if deck is all gone reset
            if (!down && gone.size == data.length) 
                setTimeout(() => gone.clear() || set(i => to(i)), 600)*/
        }
    );
    const cards = props.map(({x, y, scale}, i) => (
        <ClubCard
            i={i}
            x={x}
            y={y}
            scale={scale}
            trans={trans}
            data={data}
            bind={bind}
        />
    ));
    return (
        <div>
            {cards}
        </div>

    )
}

export default ClubDeck;