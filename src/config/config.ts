class Config {
  private static newJourneyRequest: string = "https://forms.gle/gi413N6qzPS2weHe6";

  public static getJourneyLink(): string {
    return this.newJourneyRequest;
  }
}

export default Config;
