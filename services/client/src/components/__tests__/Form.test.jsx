import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Form from '../forms/Form';

const testData = [
    {
        formType: 'Register',
        title: 'Register',
        formData: {
          username: '',
          email: '',
          password: ''
        },
        loginUser: jest.fn(),
        isAuthenticated: false,
      },
      {
        formType: 'Login',
        title: 'Log In',
        formData: {
          email: '',
          password: ''
        },
        loginUser: jest.fn(),
        isAuthenticated: false,
      }   
]
describe('Not authenticated', () => {
  testData.forEach((el) => {
    // Build component from elements
    const component = <Form {...el} />;
  // Test that each form renders correctly 
  it(`${el.formType} form renders`, () => {
    // get component wrapper
    const wrapper = shallow(component);
    //find header
    const h1 = wrapper.find('h1');
    //expect heaer to be length 1
    expect(h1.length).toBe(1);
    // expect header to be title of form
    expect(h1.get(0).props.children).toBe(el.title);
    // get fields of the form
    const formGroup = wrapper.find('.field');
    // expect legnth of formGroup to == number of keys in formData object
    expect(formGroup.length).toBe(Object.keys(el.formData).length);
    // expect name of first element in formGroup to === name of first element in formData
    expect(formGroup.get(0).props.children.props.name).toBe(Object.keys(el.formData)[0]);
    // expect value to be null because not authenticated
    expect(formGroup.get(0).props.children.props.value).toBe('');  
  });
  // test that the form snapshot hasn't changed
  it(`${el.formType} Form renders snapshot`, () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  // Test form submission for each form
  it(`${el.formType} Form submits the form`, () => {
    const wrapper = shallow(component);
    wrapper.instance().handleUserFormSubmit = jest.fn();
    wrapper.instance().validateForm = jest.fn();
    wrapper.update();
    // get input of the email field
    const input = wrapper.find('input[type="email"]');
    // confirm that form has not been submitted or changed
    expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledTimes(0);
    // simulate a change in the input field
    input.simulate('change', { target: { name: 'email', value: 'test@ing.com'} });
    //expect handleFormChange to have been called once
    // simulate a form submission with formData attached
    wrapper.find('form').simulate('submit', el.formData);
    // expect handleUserFormSubmit to have been passed the formData
    expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledWith(el.formData)
    // expect handleUserFormSubmit to have been called once
    expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().validateForm).toHaveBeenCalledTimes(1);
  })

  it(`${el.formType} form should be disabled by default`, () => {
    const wrapper = shallow(component);
    const input = wrapper.find('input[type="submit"]');
    expect(input.get(0).props.disabled).toEqual(true);
  });
})
})

  // Test forms when user is authenticated.
  describe('Authenticated', () => {
  // for each form, expect a redirect
  testData.forEach((el) => {
    const component = <Form
    formType={el.formType}
    formData={el.formData}
    isAuthenticated={true}
    />;
    it(`${el.formType} redirects`, () => {
      const wrapper = shallow(component);
      expect(wrapper.find('Redirect')).toHaveLength(1);
    });
  })
});


