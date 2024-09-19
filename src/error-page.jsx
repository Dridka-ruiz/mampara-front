import React from "react";
import { Transition } from "react-transition-group";

const duration = 300; // Duración de la animación en milisegundos

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const NotFound = () => {
  return (
    <div>
      <h1>Error 404 - Página no encontrada</h1>
      <Transition in={true} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mampara-e5ebb.appspot.com/o/erro%20404.gif?alt=media&token=7f908512-2e50-4b7f-9ab1-7b27881dd020"
              alt="Error 404"
            />
          </div>
        )}
      </Transition>
    </div>
  );
};

export default NotFound;
