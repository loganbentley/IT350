DELIMITER $$
CREATE TRIGGER start_session AFTER UPDATE ON environments
  FOR EACH ROW
  BEGIN
    IF (NEW.active = 1) THEN
      INSERT INTO sessions (environmentId, userId) VALUES (NEW.environmentId, NEW.userId);
    ELSEIF (NEW.active = 0) THEN
      UPDATE sessions
      SET endTime = NOW()
      WHERE sessions.environmentId = NEW.environmentId
      AND sessions.endTime IS NULL;
    END IF;
  END$$
