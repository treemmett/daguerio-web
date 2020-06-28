export interface KeyInteractionOptions {
  [key: string]: () => void;
  enter?: () => void;
  escape?: () => void;
  space?: () => void;
}

const keyCodes: { [keyCode: number]: string } = {
  13: 'enter',
  27: 'escape',
  32: 'space',
};

const keyInteraction = (opts: KeyInteractionOptions) => (
  e: React.KeyboardEvent | KeyboardEvent
) => {
  if (opts[keyCodes[e.keyCode]]) {
    opts[keyCodes[e.keyCode]]();
  }
};

export default keyInteraction;
