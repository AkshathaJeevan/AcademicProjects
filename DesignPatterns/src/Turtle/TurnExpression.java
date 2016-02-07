package assignment3;

public class TurnExpression implements Expression{
	
	private double angle ;
	public TurnExpression(double newAngle) {
		this.angle=newAngle;
		
	}
	@Override
	public void interpret(Context context) {
		angle = context.getInput();
		TurnVisitor move = new TurnVisitor(angle);	
	}

}