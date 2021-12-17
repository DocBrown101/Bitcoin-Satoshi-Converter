import LayoutTest from '../components/LayoutTest';

export default {
  title: 'Example/LayoutTest',
  component: LayoutTest,
};

const Template = (args) => <LayoutTest {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
