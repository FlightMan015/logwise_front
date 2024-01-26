import { createElement } from "react";
import * as lucideIcons from "lucide-react";
import PropTypes from "prop-types";

function Lucide(props) {
  try {
    const { icon, className, ...computedProps } = props;
    if (lucideIcons[props.icon] !== undefined) {
      return createElement(lucideIcons[props.icon], {
        ...computedProps,
        className: `lucide ${props.className}`,
      });
    } else {
      throw props.icon;
    }
  } catch (err) {
    // eslint-disable-next-line
    throw `Lucide icon '${props.icon}' not found.`;
    // eslint-disable-next-line
  }
}

Lucide.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
};

Lucide.defaultProps = {
  icon: "",
  className: "",
};

export default Lucide;
