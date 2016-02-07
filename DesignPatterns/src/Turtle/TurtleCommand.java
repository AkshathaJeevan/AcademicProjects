package assignment3;

public class TurtleCommand implements TurtleVisitor{
	private int totalDistance; 
	double x=0;
	double y=0;
	double angle =0;
	private boolean penPosition ;
	public static boolean PEN_UP = true;
	public static boolean PEN_DOWN = true;
	
	@Override
	public void visit(MoveVisitor moveVisitor) {
		double radianAngle = Math.toRadians(angle);
		x =  x +   Math.cos(radianAngle) * moveVisitor.getDistance();
		y =  y +    Math.sin(radianAngle) * moveVisitor.getDistance();
	}
	@Override
	public void visit(TurnVisitor turnVisitor) {
		double newAngle = angle + turnVisitor.getAngle();
		angle = newAngle % 360;
	}
	@Override
	public void visit(PenUpVisitor penUpVisitor) {
		penPosition = PEN_UP;	
	}
	@Override
	public void visit(PenDownVisitor penDownVisitor) {
		penPosition = PEN_DOWN;	
		
	}
	@Override
	public void visit(RepeatVisitor repeatVisitor) {
		// TODO Auto-generated method stub
		
	}
	

	
}
