import CenteredTextAppBar from '../components/CenteredTextAppBar';

export default {
  title: 'Example/CenteredTextAppBar',
  component: CenteredTextAppBar,
};

const Template = (args) => <CenteredTextAppBar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
