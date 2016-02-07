package assignment3;


public interface TurtleVisitor {
 
    public void visit(MoveVisitor moveVisitor);
    public void visit(TurnVisitor turnVisitor);
    public void visit(PenUpVisitor penUpVisitor);
    public void visit(PenDownVisitor penDownVisitor);
    public void visit(RepeatVisitor repeatVisitor);
   
}

