import InputElement from '../components/InputElement';

export default {
  title: 'Example/InputElement',
  component: InputElement,
};

const Template = (args) => <InputElement {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
