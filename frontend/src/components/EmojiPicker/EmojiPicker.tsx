import "./EmojiPicker.css";
import emojis from "../../data/emoji";

/**
 * Props for the EmojiPicker component.
 */
interface EmojiPickerProps {
  //TBD
}

/**
 * EmojiPicker component that displays a selection of emojis for users to choose from.
 * Renders a list of emojis
 * @returns The EmojiPicker component.
 */
const EmojiPicker: React.FC<EmojiPickerProps> = () => {
  return (
    <div className="message-emoji">
      <div className="tabs-container">
        <input type="radio" id="emoji-tab" name="tabs" defaultChecked />
        <label htmlFor="emoji-tab" className="tab-label">
          Emoji
        </label>
        <div className="tab-content">
          {emojis.map((emoji, index) => (
            <div key={index} className="emoji-icon">
              {emoji}
            </div>
          ))}
        </div>
        <input type="radio" id="gifs-tab" name="tabs" />
        <label htmlFor="gifs-tab" className="tab-label">
          GIFs
        </label>
        <div className="tab-content">GIFs Content Here. Short.</div>
      </div>
    </div>
  );
};

export default EmojiPicker;
