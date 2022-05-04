export default Dot;
declare function Dot({ index, isActive, dotColorInactive, dotColorActive, dot: DotCustom, onClick }: {
    index: any;
    isActive?: boolean | undefined;
    dotColorInactive: any;
    dotColorActive: any;
    dot: any;
    onClick: any;
}): JSX.Element;
declare namespace Dot {
    namespace propTypes {
        const index: PropTypes.Validator<number>;
        const isActive: PropTypes.Requireable<boolean>;
        const dotColorInactive: PropTypes.Requireable<string>;
        const dotColorActive: PropTypes.Requireable<string>;
        const dot: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const onClick: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
