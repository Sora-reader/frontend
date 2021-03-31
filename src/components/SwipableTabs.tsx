import * as React from 'react';
import { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import {
  AppBar,
  createStyles,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  useTheme,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

interface TabPanelProps extends HTMLAttributes<any> {
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index ? children : ''}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

type Props = {
  panels: { [key: string]: JSX.Element };
  panelWrapper?: JSX.Element;
  classes?: {
    appBar?: string;
    tab?: string;
    tabPanel?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    boxShadow: 'none',
  },
  tab: {
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    minHeight: '100vh',
  },
}));

export function SwipeableTabs(props: Props) {
  const { panels } = props;
  const classes = { ...useStyles(), ...props.classes };
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {Object.keys(panels).map((label, index) => (
            <Tab
              className={classes.tab}
              key={index}
              label={label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {Object.entries(panels).map((panel, index) => (
          <TabPanel
            key={index}
            className={classes.tabPanel}
            value={value}
            index={index}
            dir={theme.direction}
          >
            {panel[1]}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}
