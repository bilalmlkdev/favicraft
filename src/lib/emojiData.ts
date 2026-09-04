export interface EmojiEntry {
  char: string
  name: string
  category: string
}

const CATS: Record<string, string[]> = {
  Smileys: [
    '😀|Grinning Face', '😃|Grinning Face with Big Eyes', '😄|Grinning Face with Smiling Eyes',
    '😁|Beaming Face', '😆|Grinning Squinting Face', '😅|Grinning Face with Sweat',
    '🤣|Rolling on the Floor Laughing', '😂|Face with Tears of Joy', '🙂|Slightly Smiling Face',
    '🙃|Upside-Down Face', '😉|Winking Face', '😊|Smiling Face with Smiling Eyes',
    '😇|Smiling Face with Halo', '🥰|Smiling Face with Hearts', '😍|Heart Eyes',
    '🤩|Star-Struck', '😘|Face Blowing a Kiss', '😎|Smiling Face with Sunglasses',
    '🤓|Nerd Face', '🧐|Face with Monocle', '🤔|Thinking Face', '🤨|Face with Raised Eyebrow',
    '😐|Neutral Face', '😴|Sleeping Face', '🤯|Exploding Head', '🥳|Partying Face',
    '😱|Face Screaming in Fear', '🤖|Robot', '👻|Ghost', '💀|Skull', '👽|Alien',
  ],
  Activities: [
    '🥇|1st Place Medal', '🥈|2nd Place Medal', '🥉|3rd Place Medal', '🏆|Trophy',
    '⚽|Soccer Ball', '🏀|Basketball', '🏈|American Football', '⚾|Baseball',
    '🎾|Tennis', '🏐|Volleyball', '🏓|Ping Pong', '🥊|Boxing Glove', '🎯|Direct Hit',
    '🎮|Video Game', '🎲|Game Die', '🧩|Puzzle Piece', '🎳|Bowling', '🏹|Bow and Arrow',
    '🎨|Artist Palette', '🎭|Performing Arts', '🎪|Circus Tent', '🎸|Guitar',
  ],
  Nature: [
    '🔥|Fire', '⭐|Star', '🌟|Glowing Star', '✨|Sparkles', '⚡|High Voltage',
    '🌈|Rainbow', '☀️|Sun', '🌙|Crescent Moon', '🌊|Water Wave', '🌿|Herb',
    '🍀|Four Leaf Clover', '🌵|Cactus', '🌸|Cherry Blossom', '🦋|Butterfly',
    '🐝|Honeybee', '🦊|Fox', '🐺|Wolf', '🦁|Lion', '🐉|Dragon', '🐧|Penguin',
  ],
  Objects: [
    '💡|Light Bulb', '🔮|Crystal Ball', '🔑|Key', '🔒|Locked', '🛡️|Shield',
    '⚙️|Gear', '🔧|Wrench', '🧭|Compass', '📌|Pushpin', '📎|Paperclip',
    '🖥️|Desktop Computer', '💻|Laptop', '📱|Mobile Phone', '⌚|Watch',
    '🎧|Headphone', '📷|Camera', '🕹️|Joystick', '💎|Gem Stone', '🚀|Rocket',
    '🛸|Flying Saucer', '⚓|Anchor', '🧪|Test Tube', '🔬|Microscope', '📡|Satellite Antenna',
  ],
  Symbols: [
    '❤️|Red Heart', '🧡|Orange Heart', '💛|Yellow Heart', '💚|Green Heart',
    '💙|Blue Heart', '💜|Purple Heart', '🖤|Black Heart', '🤍|White Heart',
    '✅|Check Mark', '❌|Cross Mark', '⚠️|Warning', '♻️|Recycling Symbol',
    '💯|Hundred Points', '🔴|Red Circle', '🟠|Orange Circle', '🟡|Yellow Circle',
    '🟢|Green Circle', '🔵|Blue Circle', '🟣|Purple Circle', '⚫|Black Circle',
    '⚪|White Circle', '🔶|Orange Diamond', '🔷|Blue Diamond',
  ],
  Food: [
    '🍕|Pizza', '🍔|Hamburger', '🌮|Taco', '🍣|Sushi', '🍩|Doughnut', '🍪|Cookie',
    '☕|Hot Beverage', '🍺|Beer Mug', '🍷|Wine Glass', '🎂|Birthday Cake',
    '🍎|Red Apple', '🍉|Watermelon', '🍇|Grapes', '🥑|Avocado',
  ],
}

export const EMOJI_LIST: EmojiEntry[] = Object.entries(CATS).flatMap(([category, entries]) =>
  entries.map((e) => {
    const [char, name] = e.split('|')
    return { char, name, category }
  }),
)

export const EMOJI_CATEGORIES = Object.keys(CATS)
