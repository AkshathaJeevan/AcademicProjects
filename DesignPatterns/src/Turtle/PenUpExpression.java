package assignment3;

public class PenUpExpression implements Expression{

	@Override
	public void interpret(Context context) {
		PenUpVisitor penUP = new PenUpVisitor();
		penUp.accept((TurtleVisitor) context);
	}

}
