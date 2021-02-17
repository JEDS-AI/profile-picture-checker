import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 8,
    height: 80,
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  warningIcon: {
    color: "red",
  },
  checkIcon: {
    color: "green",
  },
}));

const ImageWarning = (props) => {
  const { faceAnnotations, loading } = props;
  const classes = useStyles();

  const showLoadingIndicator = () => {
    return <CircularProgress />;
  };

  const generateWarnings = () => {
    const warnings = [];
    // if angry
    if (
      faceAnnotations.angerLikelihood &&
      faceAnnotations.angerLikelihood !== "VERY_UNLIKELY"
    ) {
      warnings.push("You might look a bit angry");
    }
    // if blurred
    if (
      faceAnnotations.blurredLikelihood &&
      faceAnnotations.blurredLikelihood !== "VERY_UNLIKELY"
    ) {
      warnings.push("The image might be a bit blurry");
    }
    // if headwear
    if (
      faceAnnotations.headwearLikelihood &&
      faceAnnotations.headwearLikelihood !== "VERY_UNLIKELY"
    ) {
      warnings.push(
        "You are probably wearing a headgear, photos with headgear are not allowed"
      );
    }
    // No warning
    if (!_.isEmpty(faceAnnotations) && _.isEmpty(warnings)) {
      return (
        <div className={classes.item}>
          <CheckIcon className={classes.checkIcon} />
          <div>Great Job the image looks good</div>
        </div>
      );
    }
    return warnings.map((warning, index) => (
      <div className={classes.item} key={`warning-${index}`}>
        <WarningIcon className={classes.warningIcon} />
        <div>{warning}</div>
      </div>
    ));
  };

  return (
    <div className={classes.container}>
      {loading ? showLoadingIndicator() : generateWarnings()}
    </div>
  );
};

ImageWarning.defaultProps = {
  faceAnnotations: {},
  loading: false,
};

export default ImageWarning;
