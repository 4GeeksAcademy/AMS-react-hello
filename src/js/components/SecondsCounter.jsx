import React, { useEffect, useState } from "react";

function SecondsCounter({ seconds = 0, countdown = false, alertTime = null }) {
    const [time, setTime] = useState(countdown ? seconds : 0);
    const [isRunning, setIsRunning] = useState(true);
    const [initialTime] = useState(seconds); // Guardamos el valor inicial para reiniciar

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (countdown) {
                        if (prevTime > 0) {
                            return prevTime - 1;
                        } else {
                            clearInterval(interval);
                            return 0;
                        }
                    } else {
                        return prevTime + 1;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [isRunning, countdown]);

    useEffect(() => {
        if (alertTime !== null && time === alertTime) {
            alert(`¡Se alcanzó el tiempo especificado: ${alertTime} segundos!`);
        }
    }, [time, alertTime]);

    const handleStop = () => setIsRunning(false);
    const handleResume = () => setIsRunning(true);
    const handleReset = () => {
        setTime(countdown ? initialTime : 0);
        setIsRunning(true);
    };

    // Convertir el tiempo a una cadena de 6 dígitos (padding con ceros)
    const timeStr = String(time).padStart(6, "0").split("");

    return (
        <div className="seconds-counter">
            <div className="counter-container">
                <span className="clock-icon">⏰</span>
                {timeStr.map((digit, index) => (
                    <span key={index} className="digit">
                        {digit}
                    </span>
                ))}
            </div>
            <div className="controls">
                <button className="btn btn-primary me-2" onClick={handleStop}>
                    Parar
                </button>
                <button className="btn btn-success me-2" onClick={handleResume}>
                    Resumir
                </button>
                <button className="btn btn-warning" onClick={handleReset}>
                    Reiniciar
                </button>
            </div>
        </div>
    );
}

export default SecondsCounter;