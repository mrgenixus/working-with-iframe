# Working with Iframes
*lets just say, you probably don't*
## The setup
### jQuery

why work harder than you have to, I included jQuery so that I could poke around in the DOM without working too hard. It's also a prereq for bootstrap...
http://jquery.com

### Bootstrap

So, I just wanted this to look good; what better way
http://twitter.github.com/bootstrap/

### putting it together
put the script includes at the bottom for sanity, reliable load

## Cool Paradigm
### Bootstrap stuff
	I used the alert and button-group stuff to huge effect, I love those features
### jQuery stuff
	*$.each learn it, love it*
	the strategy was, iterate over an object, add a button for each memeber, and bind its click memeber to the button;
	after that, find out if the event-handler returns true, and post and alert with a predefined message.

## Tests
### Can I add buttons and other elements to the form in the iframe?
 YES, yes I can
### Can I remove the ones I added?
 As long as I add them
### Can I add events to existing elements?
 Yes
### Can I put my handlers ahead of the built-in ones? 
.. That's a no:
** The problem: ** to do this, we need to copy a string from the onclick event, turn it into a funciton and execute it in the correct scope: e.g. the iframe. We can't, basically.  Technically, we can use 'with' and 'eval'. If you don't understand the problem, look up the rationale for deprecating them. You read that right.
### Can I remove my handlers?
absolutely
### More tests?
Probably..  turns out this is a proof of concept for a project that's a non-starter. Same domain-policy applies. Don't try this at home. Also, apparently, if you write your own web-browser, you can get around that.