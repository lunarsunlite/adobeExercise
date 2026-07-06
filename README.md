Consider a store where items have a price per unit, but also have volume pricing and occasional
sales. For example, cookies may be $1.25 each or 6 for $6.00 or 8 for $6.00 on Fridays. Implement a
shopping cart application that accepts a date and an arbitrary ordering of products and then returns
the correct total price for the cart contents based on the unit prices, volume prices and sales as
applicable.
The products and associated data are included in the attached JSON file. Sales are not included. The
following sales should be implemented:

|Dates |Product |Sale Price|
|------|--------|----------|
|Every |Friday 8 |Cookies $6.00|
|Every October 1 |Any # of Key Lime Cheesecakes |25% off|
|Every Tuesday |Mini Gingerbread Donuts |Two for one|

You may design the application any way you like, including how you specify pricing in the system and
manage cart state.

Here are some inputs you can use for your test cases. These cases should be shown to work in your
program:
- Without any sales active 7 cookies should total $7.25
- Without any sales active, add these items: 1 cookie, 4 brownies, 1 cheesecake. Verify the
total is $16.25.
- Without any sales active, 8 cookies should total $8.50.
- Without any sales active, add these items: 1 cookie, 1 brownie, 1 cheesecake, 2 donuts.
Verify the price is $12.25.
- On October 1st, 2021, add these items: 8 cookies, 4 cheesecakes. Verify the price is $30.
- On a Tuesday, 5 donuts should total $1.50