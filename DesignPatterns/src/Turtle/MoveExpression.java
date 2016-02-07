package assignment3;

public class MoveExpression implements Expression{
	
	private int distance;
	public MoveExpression(int distance) {
		this.distance = distance;
	}
	@Override
	public void interpret(Context context) {
		distance = context.getDistance();
		MoveVisitor move = new MoveVisitor(distance);
	}

}