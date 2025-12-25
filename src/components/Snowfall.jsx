import React from "react";
import "./Snowfall.css";

const Snowfall = () => {
    const snowflakes = Array.from({ length: 40 });

    return (
        <div className="snowfall-container">
            {snowflakes.map((_, index) => {
                const left = Math.random() * 100;
                const fallDuration = 7 + Math.random() * 15; // Slower, more floaty
                const fallDelay = Math.random() * 20;
                const swayDuration = 2 + Math.random() * 4;
                const swayDelay = Math.random() * 5;
                const fontSize = 10 + Math.random() * 20;

                return (
                    <div
                        key={index}
                        className="snowflake-wrapper"
                        style={{
                            left: `${left}%`,
                            "--fall-duration": `${fallDuration}s`,
                            "--fall-delay": `-${fallDelay}s`,
                        }}
                    >
                        <div
                            className="snowflake"
                            style={{
                                fontSize: `${fontSize}px`,
                                "--sway-duration": `${swayDuration}s`,
                                "--sway-delay": `-${swayDelay}s`,
                            }}
                        >
                            ❄
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Snowfall;
