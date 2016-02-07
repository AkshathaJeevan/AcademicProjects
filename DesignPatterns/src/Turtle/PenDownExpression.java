package assignment3;

public class PenDownExpression implements Expression{

	@Override
	public void interpret(Context context) {
		PenDownVisitor penDown = new PenDownVisitor();
	}
}
