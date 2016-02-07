package assignment3;

public class TerminalExpression implements Expression {

	
	public TerminalExpression() {
		
	}
	@Override
	public void interpret(Context context) {
		context.getInput();
		
	}

}
