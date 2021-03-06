//
// MDL style Spinner component.
//
// - @see [MDL Spinner](http://www.getmdl.io/components/index.html#loading-section/spinner)
// - [Props](#props)
// - [Defaults](#defaults)
// - [Built-in builders](#builders)
//
// Created by ywu on 15/8/14.
//

const React = require('react-native');

const {
  Component,
  View,
  PropTypes,
  requireNativeComponent,
} = React;

const MKColor = require('../MKColor');
const {getTheme} = require('../theme');
const utils = require('../utils');

// default stroke color scheme
const DEF_STROKE_COLORS = [
  'rgb(66,165,245)',  // mdl palette-blue-400
  'rgb(244,67,54)',   // mdl palette-red-500
  'rgb(253,216,53)',  // mdl palette-yellow-600
  'rgb(76,175,80)',   // mdl palette-green-500
];

// ## <section id='props'>Props</section>
const PROP_TYPES = {
  // [View Props](https://facebook.github.io/react-native/docs/view.html#props)...
  ...View.propTypes,

  // Colors of the progress stroke
  // - {`Array`|`String`} can be a list of colors
  // or a single one
  strokeColor: PropTypes.any,

  // Width of the progress stroke
  strokeWidth: PropTypes.number,

  // Duration of the spinner animation, in milliseconds
  spinnerAniDuration: PropTypes.number,

  // FIXME `no propType for native prop` error on Android
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
};

const NativeSpinner = requireNativeComponent('MKSpinner', {
  name: 'MKSpinner',
  propTypes: {
    ...PROP_TYPES,
    strokeColors: PropTypes.array,  // native prop for internal usage
  },
});

//
// ## <section id='Spinner'>Spinner</section>
// The default `Spinner` component.
//
class Spinner extends Component {
  render() {
    // FIXME color has to be an int since RN v0.12, https://github.com/facebook/react-native/issues/3300
    const strokeColors = utils.parseColor(this.props.strokeColor);
    const props = Object.assign({}, this.props, {
      strokeColors: Array.isArray(strokeColors) ? strokeColors : [strokeColors],
    });

    return (
      <NativeSpinner
        {...props}
        style={[Spinner.defaultProps.style, props.style]}
      />
    );
  }
}

Spinner.propTypes = PROP_TYPES;

// ## <section id='defaults'>Defaults</section>
Spinner.defaultProps = {
  strokeWidth: 3,
  strokeColor: DEF_STROKE_COLORS,
  spinnerAniDuration: 1333,
  style: {
    width: 28,
    height: 28,
  },
};


// --------------------------
// Builder
//
const {
  Builder,
} = require('../builder');

//
// ## Spinner builder
//
class SpinnerBuilder extends Builder {
  build() {
    const BuiltSpinner = class extends Spinner {};
    BuiltSpinner.defaultProps = Object.assign({}, Spinner.defaultProps, this.toProps());
    return BuiltSpinner;
  }
}

// define builder method for each prop
SpinnerBuilder.defineProps(Spinner.propTypes);


// ----------
// ## <section id="builders">Built-in builders</section>
//
function spinner() {
  return new SpinnerBuilder().withBackgroundColor(MKColor.Transparent);
}

function singleColorSpinner() {
  return spinner().withStrokeColor(getTheme().primaryColor);
}


// ## Public interface
module.exports = Spinner;
Spinner.Builder = SpinnerBuilder;
Spinner.spinner = spinner;
Spinner.singleColorSpinner = singleColorSpinner;
