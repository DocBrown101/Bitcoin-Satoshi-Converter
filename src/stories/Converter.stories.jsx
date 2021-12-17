import Converter from '../components/Converter';

export default {
  title: 'Example/Converter',
  component: Converter,
};

const Template = (args) => <Converter {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
