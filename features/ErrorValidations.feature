Feature: Ecommerce validations
  @Validation
  @foo
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
      | username               | password    |
      | dummymailpdg@gmail.com | !Dragos0897 |
      | hello@123.com          | Iamhello@12 |